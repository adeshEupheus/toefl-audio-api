export {};

declare global {
  namespace Express {
    interface Request {
      schoolId: {
        schoolId: number;
      };

      admin: boolean;
    }
  }
}
