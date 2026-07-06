import { remember } from "./memory.js";

export function extractMemory(message) {

  const patterns = [

    {
      regex: /my favorite language is (.+)/i,
      key: "favorite language",
    },

    {
      regex: /my favourite language is (.+)/i,
      key: "favorite language",
    },

    {
      regex: /i(?:'| a)?m interested in (.+)/i,
      key: "interests",
    },

    {
      regex: /my city is (.+)/i,
      key: "city",
    },

    {
      regex: /my name is (.+)/i,
      key: "name",
    },

  ];

  let updated = [];

  for (const pattern of patterns) {

    const match = message.match(pattern.regex);

    if (!match) continue;

    const value = match[1].trim();

    remember(pattern.key, value);

    updated.push({
      key: pattern.key,
      value,
    });

  }

  return updated;

}