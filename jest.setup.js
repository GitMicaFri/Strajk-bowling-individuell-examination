jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (message.includes('React Router Future Flag Warning')) {
        return; // Ignorera specifika varningar
    }
    console.warn(message); // Logga övriga varningar
});
