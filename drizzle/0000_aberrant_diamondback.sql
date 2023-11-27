CREATE TABLE `Issues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` text,
	`status` enum('OPEN','IN_PROGRESS','CLOSED') DEFAULT 'OPEN',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` datetime,
	CONSTRAINT `Issues_id` PRIMARY KEY(`id`)
);
