namespace ThickTech.BE.Domain.Shared;
public class Request<TMaster, TDetail>
{
    public TMaster Master { get; set; }
    public ICollection<TDetail> Details { get; set; }
}
