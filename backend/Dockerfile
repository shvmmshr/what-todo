# Use official PHP 7.4 image with Apache
FROM php:7.4-apache

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli

# Copy PHP application files to Apache root
COPY . /var/www/html

# Enable Apache modules
RUN a2enmod rewrite headers

# Copy custom virtual host configuration to Apache and enable it
COPY ./my-site.conf /etc/apache2/sites-available/my-site.conf
RUN a2dissite 000-default && a2ensite my-site

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

# Start Apache in the foreground
CMD ["apache2-foreground"]
