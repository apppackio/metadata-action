const core = require("@actions/core");
const {
  CodeBuildClient,
  BatchGetProjectsCommand,
} = require("@aws-sdk/client-codebuild");

try {
  if ("AWS_DEFAULT_REGION" in process.env && !("AWS_REGION" in process.env)) {
    process.env.AWS_REGION = process.env.AWS_DEFAULT_REGION;
  }
  const client = new CodeBuildClient();
  const params = { names: [core.getInput("appname", { required: true })] };
  const command = new BatchGetProjectsCommand(params);
  client
    .send(command)
    .then((data) => {
      const project = data.projects[0];
      const dockerRepo = project.environment.environmentVariables.find(
        (e) => e.name === "DOCKER_REPO"
      ).value;
      const dockerRegistry = dockerRepo.split("/")[0];
      core.setOutput("artifacts_bucket", project.artifacts.location);
      core.info(`Artifacts Bucket: ${project.artifacts.location}`);
      core.setOutput("docker_repo", dockerRepo);
      core.info(`Docker Repo: ${dockerRepo}`);
      core.setOutput("docker_registry", dockerRegistry);
      core.info(`Docker Registry: ${dockerRegistry}`);
    })
    .catch((error) => {
      core.setFailed(error.message);
    });
} catch (error) {
  core.setFailed(error.message);
}
