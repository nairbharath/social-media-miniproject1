import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

//   const [error] = useState("");

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth" mb={2}>
        Some other provider
      </Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {/* {JSON.stringify(error)} */}
          {error.message}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;