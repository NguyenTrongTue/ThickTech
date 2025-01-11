using ThickTech.BE.Domain.Shared;

namespace ThickTech.BE.Domain.Errors;

public static class DomainErrors
{
    public static class User
    {
        public static readonly Error EmailAlreadyInUse = new(
            "User.EmailAlreadyInUse",
            "Tài khoản email đã được sử dụng");

        public static readonly Func<Guid, Error> NotFound = id => new Error(
            "User.NotFound",
            $"Không tìm thấy người dùng");

        public static readonly Error InvalidCredentials = new(
            "User.InvalidCredentials",
            "Thông tin xác thực được cung cấp không hợp lệ");

        public static readonly Error InvalidPassword = new(
           "User.InvalidPassword",
           "Mật khẩu đăng nhập không chính xác. Vui lòng kiểm tra lại");
    }

    public static class Product
    {
        public static readonly Error NotFound = new(
            "Product.NotFound",
            "Không tìm thấy sản phẩm");

    }

    public static class Category
    {
        public static readonly Error NotFound = new(
            "Category.NotFound",
            "Không tìm thấy danh mục sản phẩm");

    }
    public static class Blog
    {
        public static readonly Error NotFound = new(
            "Blog.NotFound",
            "Không tìm thấy bài viết");

    }
    public static class Order
    {
        public static readonly Error NotFound = new(
            "Order.NotFound",
            "Không tìm thấy đơn hàng");

    }
    public static class Club
    {
        public static readonly Error NotFound = new(
            "Club.NotFound",
            "Không tìm thấy câu lạc bộ");

    }
    public static class Email
    {
        public static readonly Error Empty = new(
            "Email.Empty",
            "Email không được để trống");

        public static readonly Error TooLong = new(
            "Email.TooLong",
            "Email quá dài");

        public static readonly Error InvalidFormat = new(
            "Email.InvalidFormat",
            "Định dang email không chính xác");
    }

    public static class FirstName
    {
        public static readonly Error Empty = new(
            "FirstName.Empty",
            "Tên sử dụng không được để trống");

        public static readonly Error TooLong = new(
            "LastName.TooLong",
            "Tên sử dụng quá dài");
    }
    public static class Password
    {
        public static readonly Error Empty = new(
            "Password.Empty",
            "Mật khẩu không được để trống");

        public static readonly Error TooLong = new(
            "Password.TooLong",
            "Mật khẩu sử dụng quá dài");

        public static readonly Error TooShort = new(
           "Password.TooShort",
           "Mật khẩu sử dụng quá ngắn");
        public static readonly Error InvalidFormat = new(
          "Password.InvalidFormat",
          "Mật khẩu phải bao gồm ký tự thường và số");
    }
    public static class File
    {
        public static readonly Error TypeFileError = new(
            "File.TypeFileError",
            "File bạn tạo không có trong danh mục nào");

        public static readonly Error NotFound = new(
           "File.NotFound",
           "Không tìm thấy file");
    }
    public static class Price
    {
        public static readonly Error LessThanZero = new(
            "Price.LessThanZero",
            "Giá sản phẩm không được phép nhỏ hơn 0");
    }
    public static class DiscountPrice
    {
        public static readonly Error LessThanZero = new(
            "DiscountPrice.LessThanZero",
            "Giá giảm sản phẩm không được phép nhỏ hơn 0");
        public static readonly Error InvalidDiscountPrice = new(
            "DiscountPrice.InvalidDiscountPrice",
            "Giá giảm sản phẩm không được phép lớn hơn giá bán gốc");
    }

    public static class Quantity
    {
        public static readonly Error LessThanZero = new(
            "Quantity.LessThanZero",
            "Giá sản phẩm không được phép nhỏ hơn 0");
    }
}
