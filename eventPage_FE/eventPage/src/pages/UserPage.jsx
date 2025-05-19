import { useEffect, useState } from "react";
import { Box, Heading, Text, Stack, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!id || !token) {
      setLoading(false);
      return;
    }

    // Fetch user info from backend
    fetch(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner size="xl" />;

  if (!user) return <Heading as="h2">User not found or not logged in.</Heading>;

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="sm"
    >
      <Heading as="h2" size="lg" mb={4}>
        User Profile
      </Heading>
      <Stack spacing={2}>
        {user.image && (
          <img
            src={user.image}
            alt={user.name}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        )}
        <Text>
          <strong>Name:</strong> {user.name}
        </Text>
        <Text>
          <strong>Username:</strong> {user.username}
        </Text>
      </Stack>
    </Box>
  );
};

export default UserPage;
