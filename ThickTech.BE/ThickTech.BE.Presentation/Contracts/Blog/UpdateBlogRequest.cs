namespace ThickTech.BE.Presentation.Contracts
{
    public sealed record UpdateBlogRequest(
        Guid id,
        Guid user_id,
        string title,
        string content,
        string images
        );

}
