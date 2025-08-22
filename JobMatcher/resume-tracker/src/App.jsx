import { Box, Heading, Button } from "@chakra-ui/react";

export default function App() {
  return (
    <Box textAlign="center" mt={10}>
      <Heading color="purple.500">Hello Ivy ✨</Heading>
      <Button colorScheme="teal" mt={4}>
        Click Me
      </Button>
    </Box>
  );
}
