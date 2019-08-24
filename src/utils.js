// Defer pushes a function to the back of the Browser's event queue. It essentially
// tells the browser to "do f when you next have time."
export const defer = f => setTimeout(f, 0)
