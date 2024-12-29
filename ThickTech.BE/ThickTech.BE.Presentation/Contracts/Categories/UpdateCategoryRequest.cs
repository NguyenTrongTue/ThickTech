namespace ThickTech.BE.Presentation.Contracts
{
    public sealed record UpdateCategoryRequest(
        Guid id,
        string category_name,
        string category_slug
        );

}
