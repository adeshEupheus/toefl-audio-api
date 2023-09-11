export {};

declare global {
  namespace Express {
    interface Request {
      schoolId: {
        schoolId: string;
      };
      userId: string;

      admin: boolean;
    }
  }
}
