
## AWS Elastic Beanstalk Setup (Docker)

The following instructions let you quickly install Mattermost in a non-production "Preview" mode using Amazon Web Services Elastic Bean Stalk (AWS EBS). All you need is an Amazon Web Services account to get started. 

1. Complete Install Wizard to set up a new Mattermost server using Elastic Beanstalk [Dockerrun.aws.zip](https://github.com/mattermost/platform/raw/master/docker/1.0/Dockerrun.aws.zip) file provided. 
  1. From the [**AWS Management Console**](https://aws.amazon.com/console/) select **Elastic Beanstalk**
    2. **Create an application**
    	3. Select from the top right select **Create New Application**
		3. Name the application, for example `[YOUR_ORGANIZATION_NAME]-Mattermost`, and press **Next**
	4. **Create a web server**
		5. Click **Create web server**
		6. For **Predefined configuration** look under **Generic** and select **Docker**. 
		   7. For **Environment type** select **Single instance**
		7. Under **Application Version** select **Upload your own** 
			8. Upload this file: [**Dockerrun.aws.zip**](https://github.com/mattermost/platform/raw/master/docker/1.0/Dockerrun.aws.zip). 
			9. Leave everything else as default and click **Next**
		8. On the **Environment Information** screen click **Next**
			9. If you get an error that your selected **Environment URL** is not available change **Environment name** and try **Next** again until you find one that doesn't conflict. 
	10. **Set options (defaults recommended)**
		9. On **Additional Resources** click **Next**
		10. On **Configuration Details** select an **Instance type** of **t2.small** and click **Next**
	  	12. On **Environment Tags**  click **Next**
		13. On **Permissions** click **Next**
			14. (Optional) If you haven't yet created an **Instance Profile** a tab will open to create one. Click **Allow** and return to wizard in original tab
	13. **Launch your application and web server**
		14. On **Review** press **Launch**

2. Confirm Mattermost server is working
	14. You'll see a **Dashboard** screen for your new Mattermost server. Wait for launch to complete.  
	15. Near the top of your screen, to the LEFT of the **Actions** button, you'll see a URL that looks like `[YOUR_ENVIRONMENT_NAME].elasticbeanstalk.com`. Click this URL to get to your Mattermost server. 
	16. From the Mattermost server start page you can create a new team to try out the functionality. 
	
3. (Recommended) Enable Email  
  4. On a default setup, email notifications, email verification and password reset via email are turned off by default. To use Mattermost fully configured, follow additional instructions for [enabling SMTP email](SMTP-Email-Setup.md). An example using **AWS Simple Email Service** is included in the instructions.
