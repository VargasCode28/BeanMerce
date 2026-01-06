import PDFDocument from 'pdfkit'

export const generateInvoice = (order, user, res) => {
  const doc = new PDFDocument({ margin: 50 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    `inline; filename=boleta-${order._id}.pdf`
  )

  doc.pipe(res)

  // HEADER
  doc.fontSize(20).text('BEANMERCE', { align: 'center' })
  doc.moveDown()
  doc.fontSize(12).text('Boleta de compra', { align: 'center' })
  doc.moveDown(2)

  // INFO CLIENTE
  doc.fontSize(11)
  doc.text(`Cliente: ${user.name}`)
  doc.text(`Fecha: ${new Date(order.createdAt).toLocaleDateString()}`)
  doc.text(`Orden: ${order._id}`)
  doc.moveDown()

  // DETALLE
  doc.fontSize(13).text('Detalle de productos')
  doc.moveDown(0.5)

  order.items.forEach(item => {
    doc.fontSize(11).text(
      `${item.quantity} x ${item.product?.name || 'Producto'} - $${item.price * item.quantity}`
    )
  })

  doc.moveDown()
  doc.fontSize(14).text(`TOTAL: $${order.total}`, { align: 'right' })

  doc.end()
}
