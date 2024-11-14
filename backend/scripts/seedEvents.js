import mongoose from 'mongoose';
import Event from '../models/Event.js';
import eventsData from '../data/eventsData.json';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/school-management')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing events
      await Event.deleteMany({});
      
      // Insert new events
      await Event.insertMany(eventsData.events);
      
      console.log('Events seeded successfully');
    } catch (error) {
      console.error('Error seeding events:', error);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error('Could not connect to MongoDB', err)); 