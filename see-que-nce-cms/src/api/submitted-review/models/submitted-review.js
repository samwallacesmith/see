'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    lifecycles: {
        async afterCreate(result) {
            // Send email notification
            await strapi.plugins['email'].services.email.send({
                to: 'samwallacesmith@gmail.com', // Change to reviews@see-que-nce.com when set up
                from: 'your-email@gmail.com',
                subject: 'New Submitted Review',
                text: `A new review has been submitted.\n\nTitle: ${result.title}\nContent: ${result.content}\nRating: ${result.rating}\nUser Email: ${result.email}`,
            });
        },
    },
};
