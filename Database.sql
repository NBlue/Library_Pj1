CREATE TABLE Manager(
    IdManager int primary key Identity,
    Username varchar(50) NOT NULL,
    Password varchar(50) NOT NULL
)
GO
CREATE TABLE Users (
    IdUser int primary key Identity,
    Username varchar(50) NOT NULL,
    Password varchar(50) NOT NULL,
    Name nvarchar(100) NOT NULL,
    Email varchar(50) NOT NULL,
    Address nvarchar(100) NOT NULL,
    Score int NOT NULL,
    LockNumber int NOT NULL,
    LockStatus varchar(20)
)
GO
CREATE TABLE Books (
    IdBook int primary key Identity,
    Name nvarchar(100) NOT NULL,
    TypeBook nvarchar(50) NOT NULL,
    Review nvarchar (4000) NOT NULL,
    Quantity int NOT NULL,
    ImgBook varchar(200) NOT NULL,
    LikeBook int NOT NULL,
)
GO
CREATE TABLE Authors (
    IdAuthor int primary key Identity,
    Name nvarchar(100) NOT NULL,
    ImgBook varchar(200) NOT NULL,
)
GO
CREATE TABLE Write (
    IdAuthor int,
    IdBook int,
	CONSTRAINT IdWrite PRIMARY KEY(IdAuthor, IdBook)
)
GO
CREATE TABLE Borrow (
    IdUser int,
    IdBook int,
    BorrowDate datetime,
    ReturnDatePlan datetime NOT NULL,
    ReturnDateActual datetime
	CONSTRAINT IdBorrow PRIMARY KEY(IdUser, IdBook, BorrowDate)
)