import {useCallback} from 'react'

export const useWhatsApp = () => {
 const enviarPedido = useCallback((pedidos, cel, formaEntrega, metodoPago, ubicacion) => {
    console.log('celular:', cel);
    const numeroRestaurante = cel;
    const fecha = new Date().toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    
    const precioBaseComida = pedidos.map(pedido => {
      if (pedido.guarnicionesSeleccionadas?.length > 0) {
        const totalGuarniciones = pedido.guarnicionesSeleccionadas.reduce((total, guarnicion) => {
          return total + guarnicion.price;
        }, 0);
    
        return pedido.price - totalGuarniciones;
      }
    
      return pedido.pricetotal;
    });
 console.log("Valor de precioBaseComida", precioBaseComida);
 
 // Mensaje con emojis y saltos de línea (\n)
 const mensaje = `¡NUEVO PEDIDO!\n\n` +
 `Fecha: ${fecha}\n` +
 `Forma de entrega: ${formaEntrega === 'retiro' ? 'Retira en el local' : 'Envió a domicilio'}\n` +
        `Método de pago: ${metodoPago}\n` +
        (formaEntrega === 'envio' ? `Ubicación: ${ubicacion}\n` : '') +
 `Pedido:\n${pedidos.map(p => {
   const lineaPrincipal = `  ${p.cont}x ${p.name} $${p.price * p.cont}`;
   const guarniciones = p.guarnicionesSeleccionadas?.length > 0
   ? 'Guarniciones:\n' + p.guarnicionesSeleccionadas.map(g =>
       `  ${g.cont}x ${g.name} $${g.price}`
     ).join('\n')
   : '';
   return `${lineaPrincipal}${guarniciones ? '\n' + guarniciones : ''}`;
 }).join('\n')}\n\n` +
 `Total: $${pedidos.reduce((sum, item) => sum + Number(item.priceTotal), 0)}`;

// Codificación correcta del mensaje (conserva emojis)
const mensajeCodificado = encodeURIComponent(mensaje)
const url = `https://wa.me/${numeroRestaurante}?text=${mensajeCodificado}`;
window.open(url, '_blank')
 }, []);
 return { enviarPedido}
};

export default useWhatsApp;
