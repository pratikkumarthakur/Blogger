// import { connectDB } from "@/lib/config/db";
// import EmailModel from "@/lib/models/EmailModel";
// import { NextResponse } from "next/server";

// const LoadDB= async ()=>{
//     await connectDB();
// }
// LoadDB();

// export async function POST (request){
//     const formData = await request.formData();

//     const emailData ={
// email: `${formData.get('email')}`,
//     }
//     await EmailModel.create(emailData);
//     return NextResponse.json({success:true,msg:'Email Subscribed.'})
// }

// export async function GET(request){
//     const emails = await EmailModel.find({});
//     return NextResponse.json({emails});
// }

// export async function DELETE(request){
//     const id = await request.nextUrl.searchParams.get('id')
//     await EmailModel.findByIdAndDelete(id)
//     return NextResponse.json({success:true,msg:"Email Deleted"})
// }

import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

// API endpoint to get all newsletter subscribers
export async function GET(request) {
  try {
    const emailId = request.nextUrl.searchParams.get("id");
    
    if (emailId) {
      // Get specific email subscription by ID
      const email = await EmailModel.findById(emailId);
      if (!email) {
        return NextResponse.json({ error: "Email subscription not found" }, { status: 404 });
      }
      return NextResponse.json({ email });
    } else {
      // Get all email subscriptions with sorting and analytics
      const emails = await EmailModel.find({}).sort({ date: -1 });
      
      // Calculate analytics
      const totalSubscribers = emails.length;
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const weeklyGrowth = emails.filter(email => new Date(email.date) >= weekAgo).length;
      const monthlyGrowth = emails.filter(email => new Date(email.date) >= monthAgo).length;
      
      // Get domain statistics
      const domainStats = {};
      emails.forEach(email => {
        const domain = email.email.split('@')[1];
        domainStats[domain] = (domainStats[domain] || 0) + 1;
      });
      
      const topDomains = Object.entries(domainStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([domain, count]) => ({ domain, count }));

      return NextResponse.json({ 
        success: true,
        emails,
        analytics: {
          totalSubscribers,
          weeklyGrowth,
          monthlyGrowth,
          topDomains,
          growthRate: totalSubscribers > 0 ? Math.round((weeklyGrowth / totalSubscribers) * 100 * 52) : 0 // Annual growth rate estimate
        }
      });
    }
  } catch (error) {
    console.error("Error fetching email subscribers:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch email subscribers" 
    }, { status: 500 });
  }
}

// API endpoint for newsletter subscription
export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        error: "Please provide a valid email address" 
      }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await EmailModel.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json({ 
        success: false, 
        error: "This email is already subscribed to our health newsletter" 
      }, { status: 409 });
    }

    // Create new email subscription
    const emailData = {
      email: email.toLowerCase().trim(),
      date: new Date(),
      source: formData.get('source') || 'website', // Track subscription source
      interests: formData.get('interests') || 'general', // Track user interests
      isActive: true,
      subscriptionType: 'health-newsletter'
    };

    await EmailModel.create(emailData);
    console.log("Health newsletter subscription added:", email);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to our health & wellness newsletter! 🌟"
    });

  } catch (error) {
    console.error("Error adding email subscription:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to subscribe. Please try again." 
    }, { status: 500 });
  }
}

// API endpoint to delete email subscription (unsubscribe)
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    const email = request.nextUrl.searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json({ 
        success: false, 
        error: "Please provide subscription ID or email address" 
      }, { status: 400 });
    }

    let deletedSubscription;
    
    if (id) {
      // Delete by ID (admin action)
      deletedSubscription = await EmailModel.findByIdAndDelete(id);
    } else {
      // Delete by email (user unsubscribe)
      deletedSubscription = await EmailModel.findOneAndDelete({ 
        email: email.toLowerCase() 
      });
    }

    if (!deletedSubscription) {
      return NextResponse.json({ 
        success: false, 
        error: "Subscription not found" 
      }, { status: 404 });
    }

    console.log("Email subscription removed:", deletedSubscription.email);

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from health newsletter"
    });

  } catch (error) {
    console.error("Error removing email subscription:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to unsubscribe. Please try again." 
    }, { status: 500 });
  }
}

// API endpoint to update email subscription preferences
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const updateData = {};

    // Update interests
    if (formData.get('interests')) {
      updateData.interests = formData.get('interests');
    }

    // Update active status
    if (formData.get('isActive') !== null) {
      updateData.isActive = formData.get('isActive') === 'true';
    }

    // Update subscription type
    if (formData.get('subscriptionType')) {
      updateData.subscriptionType = formData.get('subscriptionType');
    }

    updateData.updatedAt = new Date();

    const updatedSubscription = await EmailModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    if (!updatedSubscription) {
      return NextResponse.json({ 
        success: false, 
        error: "Subscription not found" 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Subscription preferences updated successfully",
      subscription: updatedSubscription
    });

  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to update subscription preferences" 
    }, { status: 500 });
  }
}