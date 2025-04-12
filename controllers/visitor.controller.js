import Visitor from "../models/visitor.model.js";

export const addVisitor = async (req, res) => {
  const { ip, location, userAgent } = req.body;

  try {
      let visitor = await Visitor.findOne({ ip });

      if (visitor) {
          visitor.viewCount += 1;
          await visitor.save();
      } else {
        const newVisitor = new Visitor({
          ip,
          location,
          userAgent,
        });
          await newVisitor.save(); 
      }

      res.status(200).json({ message: 'Visitor tracked successfully', visitor });
  } catch (error) {
      console.error('Error tracking visitor:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

export const visitorStats = async (req, res) => {
  try {
      const visitors = await Visitor.find();
      const totalVisitors = await Visitor.countDocuments();
      const uniqueVisitors = await Visitor.distinct('ip').countDocuments();
      const mostViewedVisitor = await Visitor.findOne().sort({ viewCount: -1 }).select('ip viewCount').exec();

      res.status(200).json({
          visitors,
          totalVisitors,
          uniqueVisitors,
          mostViewedVisitor,
      });
  } catch (error) {
      console.error('Error fetching visitor stats:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}