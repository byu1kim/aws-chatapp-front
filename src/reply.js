export const Reply = (content) => {
  const message = content.toLowerCase();

  let reply;
  if (message.includes("hi") || message.includes("hello")) {
    reply = "Hi, Welcome to Chat Byulpt!";
  } else if (message.includes("how are you") || message.includes("how r u")) {
    reply = "I'm find, and you?";
  } else if (message.includes("what's up")) {
    reply = "I'm bored.";
  } else if (message.includes("weather") && !message.includes("don't")) {
    reply = "Check here! https://weather.gc.ca/city/pages/bc-74_metric_e.html";
  } else if (message.includes("good")) {
    reply = "Glad to hear that!";
  } else if (message.includes("explain")) {
    reply = "I haven't learn how to explain yet.";
  } else {
    reply = "Sorry, I'm not ready to answer that question yet.";
  }

  return reply;
};
