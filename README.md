# Routing

Routing means implementing different actions for different url.

To implement routing in this example, we'll use another module called 'url'. This is necessary to parse parameters and it's values from the URL.

When sending headers we always need to do so before calling `response.end()` Method.
