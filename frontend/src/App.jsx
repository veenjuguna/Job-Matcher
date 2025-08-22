import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"

function App() {
  const [name, setName] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
    const data = await res.json()
    setUsers(prev => [...prev, data])
    setName("")
  }

  return (
    <Box bg="pink.50" minH="100vh" p={8}>
      <VStack spacing={6}>
        <Heading color="pink.600">Job Matcher </Heading>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button colorScheme="pink" onClick={handleSubmit}>
          Submit
        </Button>
        <VStack spacing={2}>
          {users.map((u, i) => (
            <Text key={i} color="pink.800" fontWeight="bold">
              {u.name}
            </Text>
          ))}
        </VStack>
      </VStack>
    </Box>
  )
}

export default App
