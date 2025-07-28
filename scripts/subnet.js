function calculateSubnet() {
  const ip = document.getElementById("ip").value;
  const cidr = parseInt(document.getElementById("cidr").value, 10);

  if (!ip || isNaN(cidr)) {
    document.getElementById("result").textContent = "Please enter valid IP and CIDR.";
    return;
  }

  const ipParts = ip.split('.').map(Number);
  const mask = ~(2 ** (32 - cidr) - 1);
  const maskParts = [(mask >> 24) & 255, (mask >> 16) & 255, (mask >> 8) & 255, mask & 255];

  const subnet = ipParts.map((octet, i) => octet & maskParts[i]);
  const broadcast = ipParts.map((octet, i) => octet | (~maskParts[i] & 255));

  document.getElementById("result").textContent = `
CIDR: /${cidr}
Subnet Mask: ${maskParts.join('.')}
Network Address: ${subnet.join('.')}
Broadcast Address: ${broadcast.join('.')}
`;
}