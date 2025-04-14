#!/bin/bash
# Set proper permissions
echo ">> Setting file permissions..." | logger -t codedeploy
chmod -R 755 /var/www/html/ccp
chown -R ec2-user:ec2-user /var/www/html/ccp

# Restart Nginx
echo ">> Restarting Nginx..." | logger -t codedeploy
systemctl restart nginx

# Ensure Nginx starts on boot
systemctl enable nginx

echo ">> Deployment completed successfully!" | logger -t codedeploy