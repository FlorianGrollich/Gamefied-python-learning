

export function verifyEnvVar() {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set');
  }

}