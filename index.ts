require('dotenv').config();
import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage, MessageAPIResponseBase,Message,FlexBubble,TextEventMessage } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import {
  fetchSensorData_1,
  fetchSensorData_2,
  fetchSensorData_3,
  fetchSensorData_4,
} from './api';

import sensorChooseJson from './json/sensorChoose.json';

const sensorChooseMessage = <Message>sensorChooseJson;

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

const util = require('util');

const PORT = process.env.PORT;

const client = new Client(clientConfig);

const app: Application = express();

async function fetchProfileName(userId: string) {
  return client
    .getProfile(userId)
    .then((profile) => {
      return profile.displayName;
    })
    .catch(console.log);
}

async function renderTeaGardenStatus_1(Id: string): Promise<Message> {
  let sensor = [];
  switch (Id) {
    case 'sensor1':
      sensor = await fetchSensorData_1();
      Id = '偵測器1號'
      break;
  }

  const contents: FlexBubble[] = sensor.data
    .slice(0, 11)
    .map((data: any) => {
      return {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type:'text',
              text:`${Id}`
            },
            {
              type: 'text',
              text: `時間:${data.time}`
            },
            {
              type: 'text',
              text: `空氣濕度（％）:${data.air_humidity}`
            },
            {
              type: 'text',
              text: `空氣氣溫（℃）:${data.air_temperature}`
            },
            {
              type: "text",
              text: `露點（℃）:${data.dew_point}`
            },
            {
              type: "text",
              text: `土壤電導度(ds/m):${data.soil_conductivity}`
            },
            {
              type: "text",
              text: `土壤含水量(%):${data.soil_moisture}`
            },
            {
              type: "text",
              text: `土壤酸鹼值:${data.soil_ph}`
            },
            {
              type: "text",
              text: `土壤溫度(℃):${data.soil_temperature}`
            },
            {
              type: "text",
              text: `光合作用有效光 PAR (μmol/m2s):${data.solar_par}`
            },
            {
              type: "text",
              text: `光照輻射(W/m^2):${data.solar_radiation}`
            },
            {
              type: "text",
              text: `風速(m/s):${data.wind_speed}`
            },
          ]
        }
      };
    })
  return {
    type: 'flex',
    altText: '為您呈現農田狀態，謝謝！',
    contents: {
      type: 'carousel',
      contents
    }
  };
}

async function handleTextMessage(
  message: TextEventMessage,
  userId: string
): Promise<Message[] | Message> {
  switch (message.text) {
    case '1':
      return sensorChooseMessage;
  }
  return {
    type: "text",
    text: "修改中"
  };
}

async function handlePostbackMessage(
  message: string
): Promise<Message[] | Message> {
  switch (message) {
    case 'sensor1':
      return await renderTeaGardenStatus_1(message as string);
    default:
      return {
        type: "text",
        text: "麻煩再點一次唷！"
      };
  }
}

const handleEvent = async (
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
  switch (event.type) {
    case 'message':
      switch (event.message.type) {
        case 'text':
          return await client.replyMessage(
            event.replyToken,
            await handleTextMessage(
              event.message as TextEventMessage,
              event.source.userId as string
            )
          );
      }
      break;
    case 'follow':
      return client.replyMessage(event.replyToken, {
        "type": "text",
        "text": "hello"
    });
    case 'postback':
      return await client.replyMessage(
        event.replyToken,
        await handlePostbackMessage(event.postback.data as string)
      );
  }
};

app.post(
  '/webhook',
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await handleEvent(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(util.inspect(err, false, null, true));
          }
          return res.status(500).json({
            status: 'error'
          });
        }
      })
    );
    if (results !== undefined) {
      return res.status(200).json({
        status: 'success',
        results
      });
    }
    return res.status(500).json({
      status: 'error'
    });
  }
);

app.get(
  '/',
  async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      status: 'success',
      message: 'Connected successfully!',
    });
  }
);

app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
});

