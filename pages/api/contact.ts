import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email?: string;
    name?: string;
    message?: string;
  };
}

type Data = {
  msg: string;
  message?: {
    id?: string;
    email?: string;
    name?: string;
    message?: string;
  };
};

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
      res.status(422).json({ msg: 'Invalid input.' });
      return;
    }

    const newMessage: Data['message'] = {
      email,
      name,
      message,
    };

    let client: MongoClient;

    const mongodb_username = process.env.mongodb_username;
    const mongodb_password = process.env.mongodb_password;
    const mongodb_clustername = process.env.mongodb_clustername;
    const mongodb_database = process.env.mongodb_database;

    const connectionString = `mongodb+srv://${mongodb_username}:${mongodb_password}@${mongodb_clustername}.dhjxu.mongodb.net/${mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ msg: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
    } catch (e) {
      client.close();
      res.status(500).json({ msg: 'Storing message failed.' });
      return;
    }

    client.close();

    res.status(201).json({ msg: 'Successfully stored message!', message: newMessage });
  }
};

export default handler;
