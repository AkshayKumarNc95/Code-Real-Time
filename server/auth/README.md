Installation and Running services- 
* Create a database in ms sql server and run the below commands - 
  1. CREATE TABLE [dbo].[tokens](
      [id] [int] IDENTITY(1,1) NOT NULL,
      [token] [varchar](255) NULL,
      [user_id] [int] NULL,
    PRIMARY KEY CLUSTERED 
    (
      [id] ASC
    )
  2. CREATE TABLE [dbo].[Users](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [first_name] [varchar](255) NULL,
    [last_name] [varchar](255) NULL,
    [user_name] [varchar](255) NULL,
    [email] [varchar](255) NULL,
    [password] [varchar](80) NULL,
  CONSTRAINT [PK__Users__3213E83FBE23A87D] PRIMARY KEY CLUSTERED 
  (
    [id] ASC
  )

* Update the .env file with database details. 