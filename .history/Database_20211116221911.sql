CREATE TABLE Book (
    IdBook int primary key Identity,
    Name nvarchar(200) NOT NULL,
    TypeBook nvarchar(50) NOT NULL,
    Review nvarchar (4000) NOT NULL,
    Quantity int NOT NULL,
    ImgBook varchar(200) NOT NULL,
    LikeBook int NOT NULL,
)