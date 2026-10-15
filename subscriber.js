const mqtt = require("mqtt");

const BROKER_URL = "mqtt://broker.hivemq.com";
const TOPIC = "smart-basket/smart-laundry-basket/energy/data";

const client = mqtt.connect(BROKER_URL, {
  connectTimeout: 10_000,
  reconnectPeriod: 2_000,
});

client.on("connect", () => {
  console.log("✅ Subscriber connected:", BROKER_URL);

  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.error("❌ Subscribe error:", err.message);
    } else {
      console.log("👂 Listening on topic:", TOPIC);
    }
  });
});

client.on("message", (topic, message) => {
  console.log("📥 Received:", message.toString());

  const data = JSON.parse(message.toString())
  if(data.watt > 500) console.log("Tidak normal")
    else console.log("Normal")
});

client.on("error", (err) => console.error("❌ MQTT error:", err.message));