// src/UploadCard.jsx
import { Box } from "@chakra-ui/react";
import ResumeUpload from './ResumeUpload';

export default function UploadCard() {
  return (
    <Box bg="pink.100" p={6} m={4} borderRadius="md" shadow="md">
      <ResumeUpload />
    </Box>
  );
}