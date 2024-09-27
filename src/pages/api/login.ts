import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const email = data.email;
  const password = data.password;

  try {
    // Your login logic here
    if (email === 'user@blis.com' && password === 'password') {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Login failed' }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
  }
}
