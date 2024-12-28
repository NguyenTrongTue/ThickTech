namespace ThickTech.BE.Domain.Primitives
{
    public class FileObject
    {
        /// <summary>
        ///  Tên file
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// Đuôi mở rộng của file
        /// </summary>
        public string FileExtension { get; set; }
        /// <summary>
        /// Đường dẫn của file
        /// </summary>
        public string FileUrl { get; set; }
        /// <summary>
        /// Kích thước file, quy đổi ra KB
        /// </summary>
        public double FileSize { get; set; }

    }
}
