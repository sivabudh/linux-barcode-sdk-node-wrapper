{
    "targets": [
      {
        'target_name': "dbr",
        'sources': [ "dbr.cc" ],
        'conditions': [
            ['OS=="linux"', {
                'defines': [
                  'LINUX_DBR',
                ],
                'libraries': [
                    "-lDynamsoftBarcodeReader"
                ]
              }]
        ]
      }
    ]
  }