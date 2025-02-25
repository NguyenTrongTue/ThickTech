﻿namespace ThickTech.BE.Core.Exceptions
{
    public class BaseException
    {
        #region Methods
        /// <summary>
        /// Mã lỗi định nghĩa
        /// </summary>
        public int ErrorCode { get; set; }

        /// <summary>
        /// Thông báo lỗi cho người dùng
        /// </summary>
        public string? UserMessage { get; set; }

        /// <summary>
        /// Traceid 
        /// </summary>
        public string? TraceId { get; set; }

        /// <summary>
        /// Thông báo khác
        /// </summary>
        public string? MoreInfor { get; set; }

        /// <summary>
        /// Trong trường hợp validate Entity có lỗi sẽ được trả về vào đây
        /// </summary>
        public object? Errors { get; set; }
        #endregion

    }
}
