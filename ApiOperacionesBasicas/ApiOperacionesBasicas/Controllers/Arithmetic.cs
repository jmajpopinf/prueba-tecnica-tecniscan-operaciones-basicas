using ApiOperacionesBasicas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiOperacionesBasicas.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class Arithmetic : ControllerBase
	{
		[HttpGet("sum/{num1}/{num2}")]
		public IActionResult Sumar(double num1, double num2) 
		{
			var resultado = new OperacionSuma
			{
				Resultado = num1 + num2,
				Operacion = "suma",
				Mensaje = "success"
			};
			return Ok(resultado);
		}

		[HttpGet("subtract/{num1}/{num2}")]
		public IActionResult Restar(double num1, double num2)
		{
			var resultado = new OperacionResta
			{
				Resultado = num1 - num2,
				Operacion = "resta",
				Mensaje = "success"
			};
			return Ok(resultado);
		}

		[HttpGet("multiply/{num1}/{num2}")]
		public IActionResult Multiplicar(double num1, double num2)
		{
			var resultado = new OperacionMultiplicacion
			{
				Resultado = num1 * num2,
				Operacion = "multiplicacion",
				Mensaje = "success"
			};
			return Ok(resultado);
		}

		[HttpGet("divide/{num1}/{num2}")]
		public IActionResult Division(double num1, double num2)
		{
			if (num2 == 0)
			{
				return BadRequest(new OperacionDivision
				{
					Mensaje = "Error: No se puede dividir por cero."
				});
				
			}

			var resultado = new OperacionDivision
			{
				Resultado = num1 / num2,
				Operacion = "division",
				Mensaje = "success"
			};
			return Ok(resultado);
		}
	}
}
