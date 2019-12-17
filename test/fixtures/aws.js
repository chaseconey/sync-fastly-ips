module.exports.securityGroup = {
  Description: "Public Fastly IPs",
  GroupName: "external-fastly-ips",
  IpPermissions: [
    {
      FromPort: 80,
      IpProtocol: "tcp",
      IpRanges: [{ CidrIp: "0.0.0.0/0" }],
      Ipv6Ranges: [],
      PrefixListIds: [],
      ToPort: 80,
      UserIdGroupPairs: []
    },
    {
      FromPort: 443,
      IpProtocol: "tcp",
      IpRanges: [{ CidrIp: "0.0.0.0/0" }],
      Ipv6Ranges: [],
      PrefixListIds: [],
      ToPort: 443,
      UserIdGroupPairs: []
    }
  ],
  OwnerId: "645511016250",
  GroupId: "sg-03cae8ee83c9cf6b5",
  IpPermissionsEgress: [
    {
      IpProtocol: "-1",
      IpRanges: [{ CidrIp: "0.0.0.0/0" }],
      Ipv6Ranges: [],
      PrefixListIds: [],
      UserIdGroupPairs: []
    }
  ],
  Tags: [],
  VpcId: "vpc-76ffc913"
};

module.exports.securityGroupEmptyRanges = {
  Description: "Public Fastly IPs",
  GroupName: "external-fastly-ips",
  IpPermissions: [],
  OwnerId: "645511016250",
  GroupId: "sg-03cae8ee83c9cf6b5",
  IpPermissionsEgress: [],
  Tags: [],
  VpcId: "vpc-76ffc913"
};
