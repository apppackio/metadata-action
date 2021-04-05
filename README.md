# AppPack Metadata GitHub Action

This action queries AWS for metadata related to an [AppPack](https://apppack.io) app. AWS credentials are required to make the necessary API calls.

## Inputs

### `appname`

**Required** Name of the AppPack app

## Outputs

### `docker_repo`

The full name of the app's Docker repository.

### `docker_registry`

The domain of the app's Docker registry

### `artifacts_bucket`

The name of the S3 bucket used for build artifacts.

## Example usage

```yaml
- name: AppPack Metadata
  id: metadata
  uses: apppackio/metadata-action@v1
  with:
    appname: my-app
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_REGION: us-east-1
```

In later steps, you will be able to reference the outputs from this action. For example, to get the build artifacts bucket, you could do:

```
${{ steps.metadata.outputs.artifacts_bucket }}
```
