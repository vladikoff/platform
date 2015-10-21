
## AWS Elastic Beanstalk Setup (Docker)

The following instructions let you quickly install Mattermost in a non-production "Preview" mode using Amazon Web Services Elastic Bean Stalk (AWS EBS). All you need is an Amazon Web Services account to get started. 

1. Complete Install Wizard to set up a new Mattermost server using Elastic Beanstalk [Dockerrun.aws.zip](https://github.com/mattermost/platform/raw/master/docker/1.0/Dockerrun.aws.zip) file provided. 
	1. From the [**AWS Management Console**](https://aws.amazon.com/console/) select **Elastic Beanstalk**
	2. Select from the top right select **Create New Application**
	3. Name the application, for example "[YOUR_ORGANIZATION_NAME]-Mattermost", and press **Next**
	4. Click **Create web server**
	6. For **Predefined configuration** look under **Generic** and select **Docker**. 
	   7. For **Environment type** select **Single instance**
	7. Under **Application Version** select **Upload your own** and upload this file: [**Dockerrun.aws.zip**](https://github.com/mattermost/platform/raw/master/docker/1.0/Dockerrun.aws.zip). Leave everything else as default and click **Next**
	8. On the **Environment Information** screen click "Check availability** to see if the URL for your new Mattermost deployment is available. If not, change **Environment name** and try again until you find an **Environment URL** that doesn't conflict with another deployment. Optionally add a **Description** up to 200 characters so you remember why you created this particularly instance, and click **Next**
	9. The **Additional Resources** page can be left unchanged unless you want advanced options. Press **Next** to continue
	10. On the **Configuration Details** page. Select an **Instance type** of **t2.small**. Optionally you can change other defaults here based on your preferences, or click **Next**
	12. If you're running a large number of environments on the **Environment Tags** page you can optionally enter tags, otherwise click **Next**
	13. On the **Permissions** screen, you'll be asked under what permissions your new server will run. You can optionally change the defaults or press **Next**. If this is the first time you've set up an EBS instance a new tab may open for creating an **Instance Profile** and you can click **Allow** then close the tab to return to the Wizard. 
	13. On the **Review** screen you'll be able to review your setting choices. To continue press **Launch**

2. Confirm Mattermost server is working
	14. After launching, you'll be redirected to a **Dashboard** screen for your new Mattermost server. You'll see animations until the service is deployed. 
	15. Near the top of your screen, to the LEFT of the **Actions** button, you'll see a URL that looks like `[YOUR_ENVIRONMENT_NAME].elasticbeanstalk.com`. Click this URL to get to your Mattermost server. 
	16. From the Mattermost server start page you can create a new team to try out the functionality. 
	
3. (Recommended) Enable Email  
  4. On a default setup, email notifications, email verification and password reset via email are turned off by default. To use Mattermost fully configured, follow additional instructions for [enabling SMTP email](SMTP-Email-Setup.md). An example using **AWS Simple Email Service** is included in the instructions.
