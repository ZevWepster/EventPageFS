import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Stack,
  useToast,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const LoginModal = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Simple password strength meter
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return (score / 4) * 100;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok && data.token && data.userId) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        toast({ title: "Login successful!", status: "success" });
        onClose();
        navigate(`/user/${data.userId}`); // <-- Use userId here
      } else {
        toast({
          title: "Login failed",
          description: data.message,
          status: "error",
        });
      }
    } catch (err) {
      toast({ title: "Network error", status: "error" });
    }
    setLoading(false);
  };
  const handleRegister = async () => {
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords do not match", status: "error" });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.username,
        }),
      });
      if (response.ok) {
        toast({ title: "Registration successful!", status: "success" });
        setIsRegister(false);
      } else {
        const data = await response.json();
        toast({
          title: "Registration failed",
          description: data.message,
          status: "error",
        });
      }
    } catch (err) {
      toast({ title: "Network error", status: "error" });
    }
    setLoading(false);
  };

  // Placeholder for OAuth
  const handleOAuth = (provider) => {
    toast({ title: `OAuth with ${provider} not implemented`, status: "info" });
    // Here you would redirect to your backend's OAuth endpoint
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isRegister ? "Register" : "Login"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Progress
                mt={2}
                value={getPasswordStrength(formData.password)}
                size="xs"
                colorScheme="green"
                aria-label="password strength"
              />
            </FormControl>
            {isRegister && (
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </FormControl>
            )}
            <Button
              colorScheme="blue"
              isLoading={loading}
              onClick={isRegister ? handleRegister : handleLogin}
            >
              {isRegister ? "Register" : "Sign In"}
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => handleOAuth("Google")}
            >
              Sign in with Google
            </Button>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => handleOAuth("Microsoft")}
            >
              Sign in with Microsoft
            </Button>
            <Text textAlign="center" fontSize="sm">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <ChakraLink
                    color="blue.500"
                    onClick={() => setIsRegister(false)}
                  >
                    Login
                  </ChakraLink>
                </>
              ) : (
                <>
                  Not yet registered?{" "}
                  <ChakraLink
                    color="blue.500"
                    onClick={() => setIsRegister(true)}
                  >
                    Register
                  </ChakraLink>
                </>
              )}
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
