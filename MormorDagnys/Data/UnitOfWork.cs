using MormorsBageri.Interfaces;
using MormorsBageri.Repositories;

namespace MormorsBageri.Data;

public class UnitOfWork(DataContext context, IAddressRepository repo) : IUnitOfWork
{
    private readonly DataContext _context = context;
    private readonly IAddressRepository _repo = repo;

    public ICustomerRepository CustomerRepository => new CustomerRepository(_context, _repo);
    public IAddressRepository AddressRepository => new AddressRepository(_context);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }
}
