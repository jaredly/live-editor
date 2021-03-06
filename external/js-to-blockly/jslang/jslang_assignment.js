// AssignmentExpression

  // ===
  // = Block Definition
  // ===

  // For getting a property of an object
  Blockly.core.Language.jslang_assignment = {
    helpUrl: '',
    init: function() {
      this.setColour(0);
      this.appendValueInput("RIGHT")
          .appendTitle("=");
      this.setOutput(true, "null");
      this.setTooltip('');
    }
  };

  // ===
  // = JS -> Blocks
  // ===

  // a = b
  // a.b = c

  Blockly.util.registerBlockSignature({
    // Pattern
      type: 'AssignmentExpression',
      left: patternMatch.var('left'),
      right: patternMatch.var('right'),
    },
    // XML generator
    function(node,matchedProps) {
        if (matchedProps.left.type !== "Identifier") {
            return;
        }
      var output = '<block type="variables_set">' +
          "<field name='VAR'>" + matchedProps.left.name + "</field>" +
          '</block>';
      var right = Blockly.util.convertAstNodeToBlocks(matchedProps.right)
      output = Blockly.util.appendTagDeep(output, right, 'value', 'VALUE')
      return output;
    }
  )

  // ===
  // = Blocks -> JS
  // ===

  // <left> = <right>
  //
  // eg: "a = 18"

  Blockly.core.JavaScript.jslang_assignment = function() {
    var value_right = Blockly.core.JavaScript.valueToCode(this, 'RIGHT', Blockly.core.JavaScript.ORDER_ATOMIC);
    // Assemble JavaScript into code variable.
    var code = "= "+value_right
    return [code, Blockly.core.JavaScript.ORDER_NONE];
  };
