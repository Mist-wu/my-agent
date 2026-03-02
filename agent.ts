import { FunctionTool, LlmAgent } from '@google/adk';
import { z } from 'zod';

/* Mock tool implementation */
const getWeather = new FunctionTool({
    name: 'get_current_weather',
    description: 'Returns the current weather in a specified city.',
    parameters: z.object({
        city: z.string().describe("The name of the city for which to retrieve the current weather."),
    }),
    execute: ({ city }) => {
        return { status: 'success', report: `The current weather in ${city} is sunny` };
    },
});

export const rootAgent = new LlmAgent({
    name: 'get-weather-agent',
    model: 'gemini-2.5-flash',
    description: 'Tells the weather in a specified city.',
    instruction: `You are a helpful assistant that tells the weather in a city. Use the 'getWeather' tool for this purpose.`,
    tools: [getWeather],
});