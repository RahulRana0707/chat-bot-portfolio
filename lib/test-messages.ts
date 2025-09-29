export const testMessages = [
  {
    parts: [
      {
        type: "text",
        text: "Can I see Rahul's resume?",
      },
    ],
    id: "gMQSprRUrTTh0cVU",
    role: "user",
  },
  {
    id: "S6VPp4kGnzzFe9O6",
    role: "assistant",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "text",
        text: 'Here’s the resume. You can download the CV using the button below.\n<|BEGIN_JSON|>\n{\n"type": "resume"\n}\n<|END_JSON|>\n',
        state: "done",
      },
    ],
  },
  {
    parts: [
      {
        type: "text",
        text: "What are his skills?",
      },
    ],
    id: "Hucw5XzyImI82qdi",
    role: "user",
  },
  {
    id: "D4qNzqHytc6U9E90",
    role: "assistant",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "text",
        text: 'Rahul is skilled in both frontend and backend technologies, with a focus on React, TypeScript, and Node.js. He also has experience with testing, DevOps, and other tools.\n<|BEGIN_JSON|>\n{\n"type": "skills"\n}\n<|END_JSON|>\n',
        state: "done",
      },
    ],
  },
  {
    parts: [
      {
        type: "text",
        text: "Give me his education details",
      },
    ],
    id: "2haeIIn72ukLZb8m",
    role: "user",
  },
  {
    id: "yg8DwgqSAjiH9ISg",
    role: "assistant",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "text",
        text: 'Rahul earned a Bachelor of Science in Information Technology from the University of Mumbai.\n<|BEGIN_JSON|>\n{\n"type": "education"\n}\n<|END_JSON|>\n',
        state: "done",
      },
    ],
  },
  {
    parts: [
      {
        type: "text",
        text: "Give me his experience details",
      },
    ],
    id: "zlvPoh2T9pFDXcmX",
    role: "user",
  },
  {
    id: "48WJxTp5XXaGGZ2N",
    role: "assistant",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "text",
        text: 'Rahul has over 2.5 years of experience as a Frontend Engineer. He\'s worked at Instinct Innovations and Sensys Technologies, focusing on building scalable applications and optimizing performance.\n<|BEGIN_JSON|>\n{\n"type": "experiences"\n}\n<|END_JSON|>\n',
        state: "done",
      },
    ],
  },
  {
    parts: [
      {
        type: "text",
        text: "Give some personal details about rahul",
      },
    ],
    id: "fPhFkgqXMqCzowpB",
    role: "user",
  },
  {
    id: "kt8x2ZeODqrhA19Z",
    role: "assistant",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "text",
        text: 'Rahul is a Frontend Engineer based in Andheri, Maharashtra, India. If you need to contact him, his email is rahul.dev.240801@gmail.com and his phone number is +91 8600639680.\n<|BEGIN_JSON|>\n{\n"type": "personal_info"\n}\n<|END_JSON|>\n',
        state: "done",
      },
    ],
  },
  {
    parts: [
      {
        type: "text",
        text: "Give some details about rahul's project.",
      },
    ],
    id: "EL9WI73BpDhWhx5s",
    role: "user",
  },
  {
    id: "AGr8jDDCMk5PrcJU",
    role: "assistant",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "text",
        text: 'Rahul has worked on a project called Crypto Castle, a crypto price tracker built with React.js, Axios, and SCSS. It features pagination, search functionality, and is deployed on Vercel.\n<|BEGIN_JSON|>\n{\n"type": "projects"\n}\n<|END_JSON|>\n',
        state: "done",
      },
    ],
  },
];
