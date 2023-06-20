import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  //send server status

  res.json({
    success: true,
    message: "Server is running.",
    data: {
      status: "online",
      uptime: process.uptime(),
      os: process.platform,
      version: process.version,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
    },
  });
});

export { router as generalRouter };
