const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.REGION });

const ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

module.exports.getIpsFromSg = function(sg) {
  let permissions = sg.IpPermissions;

  if (Array.isArray(permissions) && permissions.length === 0) {
    return [];
  }
  return permissions[0].IpRanges.map(rule => rule.CidrIp);
};

module.exports.addSgRules = function(sg, ips) {
  if (Array.isArray(ips) && ips.length === 0) {
    return;
  }

  let ranges = ips.map(ip => {
    return { CidrIp: ip };
  });

  return ec2
    .authorizeSecurityGroupIngress({
      GroupId: sg.GroupId,
      IpPermissions: [
        {
          IpProtocol: "tcp",
          FromPort: 80,
          ToPort: 80,
          IpRanges: ranges
        },
        {
          IpProtocol: "tcp",
          FromPort: 443,
          ToPort: 443,
          IpRanges: ranges
        }
      ]
    })
    .promise();
};

module.exports.removeSgRules = function(sg, ips) {
  if (Array.isArray(ips) && ips.length === 0) {
    return;
  }
  let ranges = ips.map(ip => {
    return { CidrIp: ip };
  });

  return ec2
    .revokeSecurityGroupIngress({
      GroupId: sg.GroupId,
      IpPermissions: [
        {
          IpProtocol: "tcp",
          FromPort: 80,
          ToPort: 80,
          IpRanges: ranges
        },
        {
          IpProtocol: "tcp",
          FromPort: 443,
          ToPort: 443,
          IpRanges: ranges
        }
      ]
    })
    .promise();
};

module.exports.upsertSg = async function(vpcId) {
  // Does SG already exist?
  const groupName = "external-fastly-ips";

  try {
    let sg = await this.findSg(vpcId, groupName);

    if (Array.isArray(sg.SecurityGroups) && sg.SecurityGroups.length > 0) {
      return sg.SecurityGroups[0];
    }
  } catch (error) {
    console.log(error);
  }

  try {
    await ec2
      .createSecurityGroup({
        Description: "Public Fastly IPs",
        GroupName: groupName,
        VpcId: vpcId
      })
      .promise();

    let sg = await this.findSg(vpcId, groupName);

    return sg.SecurityGroups[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports.findSg = function(vpcId, groupName) {
  return ec2
    .describeSecurityGroups({
      Filters: [
        {
          Name: "vpc-id",
          Values: [vpcId]
        },
        {
          Name: "group-name",
          Values: [groupName]
        }
      ]
    })
    .promise();
};
