import { Box, Heading, Button, VStack } from "@chakra-ui/react"

function App() {
  return (
    <Box bg="brand.50" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6}>
        <Heading color="brand.500" size="2xl">💖 Job Matcher 💖</Heading>
        <Button colorScheme="pink" size="lg">
          Get Started
        </Button>
      </VStack>
    </Box>
  )
}

export default App
