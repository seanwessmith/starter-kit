export const exampleWebhook = async (): Promise<Response> => {
  try {
    // Respond with the ASI order result.
    return new Response(
      JSON.stringify({
        success: true,
        message: `handled example webhook`,
      }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      {
        status: 200,
      }
    );
  }
};
