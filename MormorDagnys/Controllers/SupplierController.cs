using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MormorsBageri.Data;
using MormorsBageri.Entities;
using MormorsBageri.ViewModels;

namespace MormorsBageri.Controllers;

[ApiController]
[Route("api/suppliers")]
public class SupplierController(DataContext context) : ControllerBase
{
    private readonly DataContext _context = context;

    [HttpGet()]
    public async Task<ActionResult> ListAllSuppliers()
    {
        var suppliers = await _context.Suppliers

        .Select(s => new
        {
            s.SupplierId,
            s.SupplierName,
            s.SupplierEmail,
            s.SupplierPhone,
            s.ContactPerson,
            s.ImageUrl
        })

        .ToListAsync();
        return Ok(new { success = true, StatusCode = 200, data = suppliers });
    }


    [HttpGet("{id}")]
    public async Task<ActionResult> FindSupplier(int id)
    {
        var supplier = await _context.Suppliers
        .Where(s => s.SupplierId == id)
        .Select(supplier => new
        {
            supplier.SupplierId,
            supplier.SupplierName,
            supplier.SupplierPhone,
            supplier.SupplierEmail,
            supplier.ContactPerson,
            supplier.ImageUrl

        })
        .SingleOrDefaultAsync();

        if (supplier is null)
        {
            return NotFound(new { success = false, statusCode = 404, message = $"Tyvärr vi kunde inte hitta leverantör nr: {id}" });
        }
        return Ok(new { success = true, statusCode = 200, data = supplier });

    }

    [HttpPost()]
    public async Task<ActionResult> AddSupplier(SupplierPostViewModel model)
    {
        var sup = await _context.Suppliers.FirstOrDefaultAsync(s => s.SupplierName == model.SupplierName);

        if (sup != null)
        {
            return BadRequest(new { success = false, message = $"Produkten existerar redan {0}", model.SupplierName });
        }

        var supplier = new Supplier
        {
            SupplierName = model.SupplierName,
            SupplierPhone = model.SupplierPhone,
            SupplierEmail = model.SupplierEmail,
            ContactPerson = model.ContactPerson,
            ImageUrl = model.ImageUrl
        };
        try
        {
            await _context.Suppliers.AddAsync(supplier);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(FindSupplier), new { id = supplier.SupplierId }, supplier);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSupplier(int id)
    {

        var supplier = await _context.Suppliers.FindAsync(id);

        if (supplier == null)
        {

            return NotFound(new { success = false, message = $"Leverantören med id {id} hittades inte." });
        }


        _context.Suppliers.Remove(supplier);

        try
        {

            await _context.SaveChangesAsync();
            return Ok(new { success = true, message = $"Leverantören med id {id} har tagits bort." });
        }
        catch (Exception ex)
        {

            return StatusCode(500, new { success = false, message = $"Fel vid borttagning: {ex.Message}" });
        }
    }
     [HttpPut("{id}")]

    public async Task<ActionResult> UpdateSupplier(int id, string contactPerson)
    {
        var supplier = await _context.Suppliers.FirstOrDefaultAsync(s => s.SupplierId == id);

        if (supplier == null)
        {
            return NotFound(new { success = false, message = $"Kontakt Personen som du försöker uppdatera existerar inte längre ", id });

        }
        supplier.ContactPerson = contactPerson;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return NoContent();
    }
    



}
